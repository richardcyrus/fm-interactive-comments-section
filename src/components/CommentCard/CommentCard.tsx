import Avatar from '@/components/Avatar/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import type { Comment } from '@/models/db'
import { getUser } from '@/models/users'
import { formatDistanceToNowStrict } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

import IconDelete from '@/assets/icons/icon-delete.svg'
import IconEdit from '@/assets/icons/icon-edit.svg'
import IconMinus from '@/assets/icons/icon-minus.svg'
import IconPlus from '@/assets/icons/icon-plus.svg'
import IconReply from '@/assets/icons/icon-reply.svg'

import CommentForm from '@/components/CommentForm/CommentForm'

function CommentCard({
  comment,
  className,
}: {
  comment: Comment
  className?: string
}) {
  const user = useLiveQuery(() => getUser(comment.user), [comment.user])
  const { currentUser } = useAuth()
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <>
      <div
        className={cn(
          'grid max-w-[730px] grid-cols-2 grid-rows-[auto_1fr_auto] gap-4 rounded-[8px] bg-white p-4 font-normal sm:grid-cols-[auto_1fr_auto] sm:grid-rows-[auto_1fr] sm:gap-x-6 sm:p-6 [&:not(:first-of-type)]:mt-4 sm:[&:not(:first-of-type)]:mt-5',
          className
        )}
        data-comment-id={comment.id}
      >
        <div className="col-span-2 flex items-center sm:col-auto sm:col-start-2 sm:row-start-1">
          <Avatar
            username={user?.username as string}
            imageUrl={user?.image.webp || ''}
          />
          <div className="ms-4 font-medium text-blue-950">{user?.username}</div>
          {currentUser === comment.user ? (
            <div className="ms-2 shrink-0 rounded-[2px] bg-blue-500 px-[6px] text-[13px] text-white">
              you
            </div>
          ) : null}
          <div className="ms-4 leading-6">
            {comment.createdAt &&
              formatDistanceToNowStrict(new Date(comment.createdAt), {
                addSuffix: true,
              })}
          </div>
        </div>
        <div className="col-span-2 leading-6 text-gray-600 sm:col-start-2">
          {comment.isReply ? (
            <>
              <span className="font-medium text-blue-500">
                @{comment.replyingTo}
              </span>{' '}
              {comment.content}
            </>
          ) : (
            comment.content
          )}
        </div>
        <div className="flex h-10 w-[100px] items-center justify-between rounded-[10px] bg-gray-100 px-4 py-[10px] sm:col-start-1 sm:row-span-full sm:row-start-1 sm:h-[100px] sm:w-10 sm:flex-col sm:py-4">
          <button
            type="button"
            className="h-[11px] w-[11px] text-blue-300 hover:text-blue-500"
          >
            <IconPlus />
          </button>
          <span className="font-medium text-blue-500">{comment.score}</span>
          <button
            type="button"
            className="h-[3px] w-[11px] text-blue-300 hover:text-blue-500"
          >
            <IconMinus />
          </button>
        </div>
        {currentUser === comment.user ? (
          <div className="flex items-center justify-self-end sm:row-start-1">
            <button
              className="me-4 flex items-center font-medium leading-6 text-red-600 hover:text-red-200"
              data-comment-id={comment.id}
            >
              <IconDelete className="me-2 h-[14px] w-[12px]" />
              <span>Delete</span>
            </button>
            <button
              className="flex items-center font-medium leading-6 text-blue-500 hover:text-blue-300"
              data-comment-id={comment.id}
            >
              <IconEdit className="me-2 h-[14px] w-[14px]" />
              <span>Edit</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-self-end sm:row-start-1">
            <button
              type="button"
              className="flex items-center justify-self-end font-medium text-blue-500 hover:text-blue-300"
              data-comment-id={comment.id}
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <IconReply className="me-2 h-[13px] w-[14px]" />
              <span>Reply</span>
            </button>
          </div>
        )}
      </div>
      {showReplyForm ? (
        <div className="mt-2 max-w-[730px] rounded-lg bg-white p-4 sm:p-6">
          <CommentForm
            comment={{
              isReply: 1,
              replyingTo: comment.user,
              parentComment: comment.id,
              content: '',
              score: 0,
              user: currentUser,
            }}
            toggleReplyForm={() => setShowReplyForm(!showReplyForm)}
          />
        </div>
      ) : null}
      {comment.replies ? (
        <div className="mt-4 border-l-2 border-gray-200 ps-4 sm:ms-11 sm:mt-5 sm:ps-11">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              className="sm:[&:not(:first-of-type)]:mt-6"
            />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default CommentCard
