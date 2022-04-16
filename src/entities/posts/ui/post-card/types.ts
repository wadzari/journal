import { FC } from 'react'

export enum PostCardVariant {
  Point = 'point',
  Line = 'line',
  LongLine = 'long line',
}

export type PostData = {
  variant: PostCardVariant
  uid: string
  title: string
  previewUrl?: string
  publicationDate: number
}

export type PostCardMap = Readonly<Record<PostCardVariant, FC<PostData>>>

export type Props = {
  variant?: PostCardVariant
  postData: PostData
}
