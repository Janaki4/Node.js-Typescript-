export interface PostInterface { 
    description: string
    image: string
    isImageAvailable: boolean
    authorId: string
    taggedPeople: Array<string>
    isDeleted:boolean
}