import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceRepository } from './place.repository';
import { IPlaceService } from './interfaces/place.service.interface';
import { IPlaceRepository } from './interfaces/place.repository.interface';

@Module({
  imports: [ConfigModule],
  controllers: [PlaceController],
  providers: [
    {
      provide: IPlaceRepository,
      useClass: PlaceRepository,
    },
    {
      provide: IPlaceService,
      useClass: PlaceService,
    },
  ],
  exports: [IPlaceService],
})
export class PlaceModule {}
