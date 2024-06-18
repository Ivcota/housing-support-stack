import { Button } from "./ui/button";
import { Comment } from "@/types/application";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

const useTimeAgo = () => {
    const timeAgo = (date: Date) => {
        const diff = new Date().getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours} hours ago`;
        }

        if (minutes > 0) {
            return `${minutes} minutes ago`;
        }

        return `Just now`;
    };
    return { timeAgo };
};

const CommentComponent = ({ comment }: { comment: Comment }) => {
    const { timeAgo } = useTimeAgo();
    const {
        props: { auth },
    } = usePage<PageProps>();
    return (
        <div className="flex flex-col gap-2 sm:max-w-sm">
            <div className="text-sm flex gap-2">
                <div>{comment.user.name} -</div>
                <div>{timeAgo(new Date(comment.created_at))}</div>
            </div>
            <p>{comment.comment}</p>
            {auth.user.id === comment.user_id && (
                <Button variant="outline-destructive" className="self-end w-20">
                    Delete
                </Button>
            )}
        </div>
    );
};

export const Comments = ({ comments }: { comments?: Comment[] }) => {
    return (
        <div className="rounded-md gap-11 flex flex-col">
            {comments &&
                comments.map((comment) => (
                    <CommentComponent key={comment.id} comment={comment} />
                ))}
        </div>
    );
};
