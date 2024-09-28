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

import type { Comment } from '@/models/db'

const FormSchema = z.object({
  id: z.number(),
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
  comment: Omit<Comment, 'replies' | 'createdAt'>
  closeEditForm: () => void
}

type FormValues = z.infer<typeof FormSchema>

function CommentEditForm({ comment, closeEditForm }: CommentFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: comment
      ? {
          id: comment.id,
          content: comment.content,
          score: comment.score,
          user: comment.user,
          isReply: comment.isReply,
          replyingTo: comment.replyingTo,
          parentComment: comment.parentComment,
        }
      : undefined,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    if (closeEditForm !== undefined) closeEditForm()
    form.reset()
  }

  // TODO: For troubleshooting only
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onErrors(errors: any) {
    console.log(errors)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onErrors)} className="">
        <input type="hidden" {...form.register('id')} />
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
            <FormItem>
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
        <div className="mt-4 flex space-x-2">
          <Button
            type="button"
            variant="outline"
            className="ms-auto h-12 w-[104px] uppercase"
            onClick={closeEditForm}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="ms-auto h-12 w-[104px] bg-blue-500 uppercase hover:bg-blue-300"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CommentEditForm
