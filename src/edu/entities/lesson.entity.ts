import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class Lesson extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	order: number;

	@Prop(
		raw({
			videos: { type: [] },
			keynotes: { type: [] }
		})
	)
	content: Record<string, any>;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson).set('toJSON', {
	transform: (doc, entity) => {
		entity.hash = entity._id;
		delete entity._id;
		delete entity.__v;
	}
});