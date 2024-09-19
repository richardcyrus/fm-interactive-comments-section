import Avatar from '@/components/Avatar/Avatar'
import type { Comment } from '@/models/db'
import { getUser } from '@/models/users'
import { formatDistanceToNow } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'

import IconMinus from '@/assets/icons/icon-minus.svg?react'
import IconPlus from '@/assets/icons/icon-plus.svg?react'
import IconReply from '@/assets/icons/icon-reply.svg?react'

function CommentCard({ comment }: { comment: Comment }) {
  const user = useLiveQuery(() => getUser(comment.user), [comment.user])

  return (
    <div
      className="grid grid-cols-2 grid-rows-[auto_1fr_auto] gap-4 rounded-[8px] bg-white p-4 font-normal [&:not(:first-of-type)]:mt-4"
      data-comment-id={comment.id}
    >
      <div className="col-span-2 flex items-center">
        <Avatar
          username={user?.username as string}
          imageUrl={user?.image.webp || ''}
        />
        <div className="ms-4 font-medium text-blue-950">{user?.username}</div>
        <div className="ms-4 leading-6">
          {comment.createdAt &&
            formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
        </div>
      </div>
      <div className="col-span-2 leading-6 text-gray-600">
        {comment.content}
      </div>
      <div className="flex w-24 items-center justify-between rounded-[10px] bg-gray-100 px-4 py-[10px]">
        <button type="button" className="h-[11px] w-[11px]">
          <IconPlus />
        </button>
        <span className="font-medium text-blue-500">{comment.score}</span>
        <button type="button" className="h-[3px] w-[11px]">
          <IconMinus />
        </button>
      </div>
      <button
        className="flex items-center justify-self-end font-medium text-blue-500"
        data-comment-id={comment.id}
      >
        <IconReply className="me-2 h-[13px] w-[14px]" />
        <span>Reply</span>
      </button>
    </div>
  )
}

export default CommentCard
