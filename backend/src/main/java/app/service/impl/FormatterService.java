package app.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

@Service
public class FormatterService {

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public LocalDate stringToDate(String dateStr) {
        return LocalDate.parse(dateStr, dateFormatter);
    }

    public String dateToString(LocalDate date) {
        return date.format(dateFormatter);
    }

    public LocalTime stringToTime(String timeStr) {
        return LocalTime.parse(timeStr, timeFormatter);
    }

    public String timeToString(LocalTime time) {
        return time.format(timeFormatter);
    }

    public LocalDateTime stringToDateTime(String dateTimeStr) {
        return LocalDateTime.parse(dateTimeStr, dateTimeFormatter);
    }

    public String dateTimeToString(LocalDateTime dateTimeStr) {
        return dateTimeStr.format(dateTimeFormatter);
    }

    public boolean isFuture(LocalDate date) {
        LocalDate today = LocalDate.now();
        return date.isAfter(today);
    }

    public boolean isPast(LocalDate date) {
        LocalDate today = LocalDate.now();
        return date.isBefore(today);
    }

    public LocalDate toLocalDate(LocalDateTime dateTime) {
        return dateTime.toLocalDate();
    }

    public LocalTime toLocalTime(LocalDateTime dateTime) {
        return dateTime.toLocalTime();
    }

    public LocalDateTime toLocalDateTime(LocalDate date, LocalTime time) {
        return LocalDateTime.of(date, time);
    }
}
