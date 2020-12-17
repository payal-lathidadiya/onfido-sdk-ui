// Generated by dts-bundle-generator v5.5.0

export declare type SupportedLanguages = "en_US" | "en" | "de_DE" | "de" | "es_ES" | "es" | "fr_FR" | "fr";
export interface LocaleConfig {
	locale?: SupportedLanguages;
	phrases: Record<string, unknown>;
	mobilePhrases?: Record<string, unknown>;
}
export declare type StepTypes = "welcome" | "document" | "poa" | "face" | "complete";
export declare type StepConfigBase = {
	type: StepTypes;
};
export declare type StepOptionWelcome = {
	title?: string;
	descriptions?: string[];
	nextButton?: string;
};
export declare type StepOptionDocument = {
	documentTypes?: {
		passport?: boolean;
		driving_licence?: boolean;
		national_identity_card?: boolean;
		residence_permit?: boolean;
	};
	showCountrySelection?: boolean;
	forceCrossDevice?: boolean;
	useLiveDocumentCapture?: boolean;
	uploadFallback?: boolean;
	useWebcam?: boolean;
};
export declare type StepOptionPoA = {
	country?: string;
	documentTypes: {
		bank_building_society_statement?: boolean;
		utility_bill?: boolean;
		council_tax?: boolean;
		benefit_letters?: boolean;
		government_letter?: boolean;
	};
};
export declare type StepOptionFace = {
	requestedVariant?: "standard" | "video";
	uploadFallback?: boolean;
	useMultipleSelfieCapture?: boolean;
};
export declare type StepOptionComplete = {
	message?: string;
	submessage?: string;
};
export declare type StepConfigWelcome = {
	options?: StepOptionWelcome;
} & StepConfigBase;
export declare type StepConfigDocument = {
	options?: StepOptionDocument;
} & StepConfigBase;
export declare type StepConfigPoA = {
	options?: StepOptionPoA;
} & StepConfigBase;
export declare type StepConfigFace = {
	options?: StepOptionFace;
} & StepConfigBase;
export declare type StepConfigComplete = {
	options?: StepOptionComplete;
} & StepConfigBase;
export declare type StepConfig = StepConfigWelcome | StepConfigDocument | StepConfigPoA | StepConfigFace | StepConfigComplete;
export interface DocumentResponse {
	id: string;
	side: string;
	type: string;
}
export interface FaceResponse {
	id: string;
	variant: string;
}
export interface SdkResponse {
	document_front: DocumentResponse;
	document_back?: DocumentResponse;
	face: FaceResponse;
}
export interface SdkError {
	type: "exception" | "expired_token";
	message: string;
}
export declare type ServerRegions = "US" | "EU" | "CA";
export interface FunctionalConfigurations {
	disableAnalytics?: boolean;
	mobileFlow?: boolean;
	roomId?: string;
	tearDown?: boolean;
	useMemoryHistory?: boolean;
}
export interface SdkOptions extends FunctionalConfigurations {
	onComplete?: (data: SdkResponse) => void;
	onError?: (error: SdkError) => void;
	onModalRequestClose?: () => void;
	token?: string;
	useModal?: boolean;
	isModalOpen?: boolean;
	shouldCloseOnOverlayClick?: boolean;
	containerId?: string;
	containerEl?: HTMLElement | null;
	language?: SupportedLanguages | LocaleConfig;
	region?: ServerRegions;
	smsNumberCountryCode?: string;
	userDetails?: {
		smsNumber?: string;
	};
	steps?: Array<StepTypes | StepConfig>;
	enterpriseFeatures?: {
		hideOnfidoLogo?: boolean;
		cobrand?: {
			text: string;
		};
	};
}
export interface SdkHandle {
	options: SdkOptions;
	setOptions(options: SdkOptions): void;
	tearDown(): void;
}
export declare type SdkInitMethod = (options: SdkOptions) => SdkHandle;
export declare const init: SdkInitMethod;

export {};
