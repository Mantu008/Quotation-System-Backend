import ErrorResDto from "../dto/res/ErrorResDto";

export default interface CommonGetOneType<Type> {
	isSuccess: boolean;
	item?: Type;
	hasException: boolean;
	errorResDto?: ErrorResDto;
}
