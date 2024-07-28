import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the AIOutput document
export interface AIOutputInterface extends Document {
    formData: Record<string, any>; //Flexible object type
    aiResponse?: string; // Marking aiResponse as optional
    templateSlug: string;
    createdBy: string;
    createdAt: Date;
}

// Define the schema for AIOutput
const AIOutputSchema: Schema<AIOutputInterface> = new Schema({
    formData: {
        type: Schema.Types.Mixed,
        required: [true, "formData is required"],
    },
    aiResponse: {
        type: String,
    },
    templateSlug: {
        type: String,
        required: [true, "templateSlug is required"],
    },
    createdBy: {
        type: String,
        required: [true, "createdBy is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now without parentheses because when you are using parentheses it will store first Date value, not current value
    },
});

// Create the model for AIOutput
const AIOutput =
    (mongoose.models.AIOutput as mongoose.Model<AIOutputInterface>) ||
    mongoose.model<AIOutputInterface>("AIOutput", AIOutputSchema);

export default AIOutput;
