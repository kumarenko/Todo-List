export default class ServerConfig{
    static devMode: boolean | null = false; // true for development; false for production; null for staging.
    static prodUrl: string = 'https://todo-list-backend-liart.vercel.app/';
    static testUrl: string = 'http://localhost:4000/';
    static stagingUrl: string = 'https://todo-list-backend-liart.vercel.app/';

    static getUrl(): string {
        switch(ServerConfig.devMode){
            case true:
                return ServerConfig.testUrl;
            case false:
                console.log = () => {}; // Disable console.log
                return ServerConfig.prodUrl;
            default:
                console.log = () => {}; // Disable console.log
                return ServerConfig.stagingUrl;
        }
    }
}
