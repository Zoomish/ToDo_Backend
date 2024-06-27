export class CreateTaskDto {
    readonly user_id: number

    readonly title: string

    readonly description: string

    readonly tags: string

    readonly image: string

    readonly time: Date

    readonly notification: Date

    readonly pereodic: Array<number>
}
