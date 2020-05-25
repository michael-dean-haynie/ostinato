
export class SerializedReminder {
    uuid: string;
    name: string;
    timeoutDuration: number;

    consoleNotification: boolean;
    visualNotification: boolean;
    audioNotification: boolean;

    waitForAkng: boolean;
    autoAkng: boolean;
    autoAkngTimeoutDuration: number;
}
