export interface UrlInfo {
  careeresUrl: string;
}

export interface CareeresInterviewInfo {
  companyName: string;
  careersContents: string;
}

export interface SaveCareeresInterviewInfo extends CareeresInterviewInfo {
  careeresURL: string;
  time: number;
}

// export class CareersInterviewDto {
//     @IsString()
//     @ApiProperty({ type: String, description: '회사명' })
//     companyName: string;

//     @IsString()
//     @ApiProperty({ type: String, description: '모집 공고 내용' })
//     careersContents: string;

//     @IsString()
//     @ApiProperty({ type: String, description: '모집 공고 주소' })
//     careersURL: string;

//     @IsNumber()
//     @ApiProperty({ type: String, description: '제한 시간' })
//     time: number;
//   }
