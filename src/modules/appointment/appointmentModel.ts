import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Model } from '../../model';

export class CreateModel extends Model {
  @IsString()
  @IsNotEmpty()
  public patientId: string;

  @IsString()
  @IsNotEmpty()
  public doctorId: string;

  constructor(body: any) {
    super();
    const { patientId, doctorId } = body;

    this.patientId = patientId;
    this.doctorId = doctorId;
  }
}

export class UpdateModel extends Model {
  @IsString()
  @IsOptional()
  public patientId: string;

  @IsString()
  @IsOptional()
  public doctorId: string;

  @IsBoolean()
  @IsOptional()
  public available: boolean;

  constructor(body: any) {
    super();
    const { patientId, doctorId, available } = body;

    this.patientId = patientId;
    this.doctorId = doctorId;
    this.available = available;
  }
}
