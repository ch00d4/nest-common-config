import { IsOptional } from 'class-validator';

export default class PaginationParams {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
