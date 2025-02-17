import { cn, formatDate, formatTime } from "@/lib/utils";
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'
export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
    const { _createdAt, views, author: author, title, category, _id, description, image } = post;
    const imageSrc = image && image.includes("github.com") && !image.includes("?raw=true")
        ? `${image}?raw=true`
        : image || '/default-placeholder.jpg';

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup-card-date'>
                    {formatDate(_createdAt)} <br />
                    {formatTime(post?._createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-gray-900' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>
            <div className='flex-between mt-5 gap-5 bg-gray-200 p-2 rounded-xl'>
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>
                            {author?.name}
                        </p>
                        <p>
                            @{author?.username}
                        </p>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image
                        src={author?.image || '/default-placeholder.jpg'}
                        alt={author?.name ?? 'Unknown Author'}
                        width={48}
                        height={48}
                        className='rounded-full'
                    />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <h3 className='text-26-semibold line-clamp-1'>
                    {title}
                </h3>
            </Link>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>
                    {description}
                </p>
                <Image
                    src={imageSrc || '/default-placeholder.jpg'}  // Ensure a valid string
                    alt='Startup image'
                    width={500}
                    height={300}
                    className='startup-card_img'
                />
            </Link>
            <div className='flex-between gap-3 mt-5'>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium'>#{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>

            </div>

        </li>
    )
}

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
            <li key={cn("skeleton", index)}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
);
export default StartupCard