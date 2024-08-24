package app.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import app.exception.InvalidParamException;

@Service
public class FormatterService {

    DateTimeFormatter dateFormatterType1 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    DateTimeFormatter dateFormatterType2 = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    DateTimeFormatter dateFormatterType3 = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    DateTimeFormatter dateFormatterType4 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    DateTimeFormatter dateTimeFormatterType1 = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    DateTimeFormatter dateTimeFormatterType2 = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
    DateTimeFormatter dateTimeFormatterType3 = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
    DateTimeFormatter dateTimeFormatterType4 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

    private List<DateTimeFormatter> dateTimeFormatters = List.of(
            dateTimeFormatterType1,
            dateTimeFormatterType2,
            dateTimeFormatterType3,
            dateTimeFormatterType4);

    private List<DateTimeFormatter> dateFormatters = List.of(
            dateFormatterType1,
            dateFormatterType2,
            dateFormatterType3,
            dateFormatterType4);

    public LocalDate stringToDate(String dateStr) throws Exception {
        for (DateTimeFormatter dateTimeFormatter : dateFormatters) {
            try {
                return LocalDate.parse(dateStr, dateTimeFormatter);
            } catch (Exception e) {

            }
        }
        throw new InvalidParamException("Could not parse, format must be yyyy-MM-dd");
    }

    public String dateToString(LocalDate date) throws Exception {
        try {
            return date.format(dateFormatterType1);
        } catch (Exception e) {
            throw new InvalidParamException("Could not format, must be dd/MM/yyyy");
        }
    }

    public LocalTime stringToTime(String timeStr) throws Exception {
        try {
            return LocalTime.parse(timeStr, timeFormatter);
        } catch (Exception e) {
            throw new InvalidParamException("Could not parse, format must be HH:mm");
        }
    }

    public String timeToString(LocalTime time) throws Exception {
        try {
            return time.format(timeFormatter);
        } catch (Exception e) {
            throw new InvalidParamException("Could not format, must be HH:mm");
        }
    }

    public LocalDateTime stringToDateTime(String dateTimeStr) throws Exception {
        for (DateTimeFormatter dateTimeFormatter : dateTimeFormatters) {
            try {
                return LocalDateTime.parse(dateTimeStr, dateTimeFormatter);
            } catch (Exception e) {

            }
        }
        throw new InvalidParamException("Could not parse, format must be yyyy-MM-dd HH:mm");
    }

    public String dateTimeToString(LocalDateTime dateTimeStr) throws Exception {
        try {
            return dateTimeStr.format(dateTimeFormatterType1);
        } catch (Exception e) {
            throw new InvalidParamException("Could not format, must be dd/MM/yyyy HH:mm");
        }
    }

    public boolean isFuture(LocalDate date) throws Exception {
        try {
            LocalDate today = LocalDate.now();
            return date.isAfter(today);
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc");
        }
    }

    public boolean isFuture(LocalDateTime date) throws Exception {
        try {
            LocalDateTime today = LocalDateTime.now();
            return date.isAfter(today);
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc");
        }
    }

    public boolean isPast(LocalDateTime date) throws Exception {
        try {
            LocalDateTime today = LocalDateTime.now();
            return date.isBefore(today);
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc");
        }
    }

    public boolean isBefore(LocalDateTime startDate, LocalDateTime endDate) throws Exception {
        try {
            return startDate.isBefore(endDate);
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc");
        }
    }

    public boolean isBefore(LocalDate startDate, LocalDate endDate) throws Exception {
        try {
            return startDate.isBefore(endDate);
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc");
        }
    }

    public LocalDate toLocalDate(LocalDateTime dateTime) throws Exception {
        try {
            return dateTime.toLocalDate();
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc, yyyy-MM-dd HH:mm:ss");
        }
    }

    public LocalTime toLocalTime(LocalDateTime dateTime) throws Exception {
        try {
            return dateTime.toLocalTime();
        } catch (Exception e) {
            throw new InvalidParamException("Vui lòng chọn ngày bắt đầu/kết thúc, yyyy-MM-dd HH:mm:ss");
        }
    }

    public LocalDateTime toLocalDateTime(LocalDate date, LocalTime time) throws Exception {
        try {
            return LocalDateTime.of(date, time);
        } catch (Exception e) {
            throw new InvalidParamException(
                    "Vui lòng chọn ngày bắt đầu/kết thúc, date is yyyy-MM-dd, time is HH:mm:ss");
        }
    }

    public LocalDateTime dateToDateTime(Date date) throws Exception {
        if (date == null) {
            throw new InvalidParamException("Date cannot be null");
        }
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }
}
