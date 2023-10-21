export class CreateUserDto {
  username!: string;
  password!: string;
  role!: string;
}
export class CreateEstablishmentDto {
  name!: string;
  description!: string;
}
export class CreateImageDto {
  url!: string;
}
export class CreateReviewDto {
  qualityRating!: number;
  serviceRating!: number;
  environmentRating!: number;
  comment!: string;
}
export interface CreateReviewDto {
  qualityRating: number;
  serviceRating: number;
  environmentRating: number;
  comment: string;
  userId: number;
  establishmentId: number;
}