package app.constants;

import org.springframework.beans.factory.annotation.Value;

public class Constants {
    @Value("${url.backend}")
    public static String urlBackend;
    @Value("${url.customer}")
    public static String urlCustomer;
    @Value("${url.staff}")
    public static String urlStaff;
}
