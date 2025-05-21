import { ApiProperty } from '@nestjs/swagger';

export default class PaginationResponse {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
