import { isEmpty} from "./isEmpty";

export const validatePostInput = (data) => {
    let errors = {};
    data.title =  data.title ? data.title : "";
    data.richText = data.richText ? data.richText : "";
    data.author = data.author ? data.author : "";

    if(isEmpty(data.title)){
        errors.title = "Title field is required.";
    }

    if(isEmpty(data.richText)){
        errors.message = "Message field is required.";
    }

    if(isEmpty(data.author)){
        errors.author = "Author field is required.";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}