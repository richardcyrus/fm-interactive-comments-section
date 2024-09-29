import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import Avatar from '@/components/Avatar/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { addComment, addCommentReply } from '@/models/comments'
import type { Comment } from '@/models/db'
import { getUser } from '@/models/users'
import { useLiveQuery } from 'dexie-react-hooks'

const FormSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'An entry is required' })
    .max(250, { message: 'Cannot be longer than 250 characters.' }),
  score: z.number(),
  user: z.string(),
  isReply: z.union([z.literal(0), z.literal(1)]),
  replyingTo: z.string().optional(),
  parentComment: z.number().optional(),
})

type CommentFormProps = {
  comment?: Omit<Comment, 'id' | 'replies' | 'createdAt'>
  toggleReplyForm?: () => void
}
type FormValues = z.infer<typeof FormSchema>

function CommentForm({ comment, toggleReplyForm }: CommentFormProps) {
  const { currentUser } = useAuth()
  const user = useLiveQuery(() => getUser(currentUser), [currentUser])

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: comment
      ? {
          content: comment.content,
          score: comment.score,
          user: comment.user,
          isReply: comment.isReply,
          replyingTo: comment.replyingTo,
          parentComment: comment.parentComment,
        }
      : {
          content: '',
          score: 0,
          user: currentUser,
          isReply: 0,
          replyingTo: '',
          parentComment: 0,
        },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.isReply === 1) {
      await addCommentReply(
        data.content,
        data.score,
        data.user,
        data.replyingTo as string,
        data.parentComment as number
      )
    } else {
      await addComment(data.content, data.user)
    }

    form.reset()
    if (toggleReplyForm !== undefined) toggleReplyForm()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 grid-rows-[minmax(0,1fr)_auto] gap-4 sm:grid-cols-[auto_1fr_auto] sm:grid-rows-1"
      >
        <input type="hidden" {...form.register('score')} />
        <input type="hidden" {...form.register('user')} />
        <input type="hidden" {...form.register('isReply')} />
        {form.getValues('replyingTo') !== '' ? (
          <input type="hidden" {...form.register('replyingTo')} />
        ) : null}
        <input type="hidden" {...form.register('parentComment')} />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:space-y-0">
              <FormLabel className="sr-only">Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-24 resize-none text-base focus-visible:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2" />
            </FormItem>
          )}
        />
        <div className="my-auto sm:col-start-1 sm:row-start-1 sm:mt-0.5">
          <Avatar
            username={user?.username as string}
            imageUrl={user?.image.webp || ''}
            className="sm:h-10 sm:w-10"
          />
        </div>
        <Button
          type="submit"
          className="ms-auto h-12 w-[104px] bg-blue-500 uppercase hover:bg-blue-300 sm:col-start-3 sm:row-start-1"
        >
          {form.getValues('replyingTo') !== '' ? 'Reply' : 'Send'}
        </Button>
      </form>
    </Form>
  )
}

export default CommentForm
