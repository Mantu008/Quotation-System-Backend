import ErrorResDto from "../dto/res/ErrorResDto";

export default interface CommonGetListType<Type> {
	isSuccess: boolean;
	hasException: boolean;
	items?: Type[];
	errorResDto?: ErrorResDto;
}
