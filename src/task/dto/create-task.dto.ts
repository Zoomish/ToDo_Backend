export class CreateTaskDto {
    readonly user_id: number

    readonly title: string

    readonly description: string

    readonly tags: string

    readonly image: string

    readonly repository: string

    readonly live: string
}
