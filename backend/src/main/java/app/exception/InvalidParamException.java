package app.exception;

/**
 * InvalidParamException
 * Version: 1.0
 * Date: 5/23/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/23/2024 kiet-kun-afk Create
 */
public class InvalidParamException extends Exception {
    public InvalidParamException(String message) {
        super(message);
    }
}