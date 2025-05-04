interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    grammars: SpeechGrammarList | null;
    serviceURI: string;
    abort: () => void;
    start: () => void;
    stop: () => void;
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}

declare var SpeechRecognition: SpeechRecognitionStatic | undefined;
declare var webkitSpeechRecognition: SpeechRecognitionStatic | undefined;

interface SpeechGrammar extends EventTarget {
    src: string;
    weight: number;
}

interface SpeechGrammarStatic {
    new(): SpeechGrammar;
}

declare var SpeechGrammar: SpeechGrammarStatic | undefined;

interface SpeechGrammarList extends EventTarget {
    length: number;
    addFromString: (string: string, weight?: number) => void;
    addFromURI: (uri: string, weight?: number) => void;
    item: (index: number) => SpeechGrammar | null;
    [index: number]: SpeechGrammar;
}

interface SpeechGrammarListStatic {
    new(): SpeechGrammarList;
}

declare var SpeechGrammarList: SpeechGrammarListStatic | undefined;

interface SpeechRecognitionErrorEvent extends Event {
    error: SpeechRecognitionErrorCode;
    message: string;
}

type SpeechRecognitionErrorCode =
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-unavailable"
    | "bad-grammar"
    | "language-not-supported";

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResult extends EventTarget {
    readonly isFinal: boolean;
    readonly length: number;
    item: (index: number) => SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item: (index: number) => SpeechRecognitionResult | null;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
    readonly confidence: number;
    readonly transcript: string;
}