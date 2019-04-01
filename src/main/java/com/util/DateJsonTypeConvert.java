package com.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 通过继承JsonSerializer类来自定义格式，之后在实体类对应的date类型的字段的getter方法上添加注解
 * 
 * @author 30255
 * 
 */
public class DateJsonTypeConvert extends JsonSerializer<Date> {

	// 用于序列化字符串
	@Override
	public void serialize(Date date, JsonGenerator generator,
			SerializerProvider arg2) throws IOException,
			JsonProcessingException {
		// 自己定义日期格式
		SimpleDateFormat sdf = new SimpleDateFormat(setPattern(1));
		// 将数据以json格式输出
		generator.writeString(sdf.format(date));
	}

	public static String setPattern(int choose) {
		String backType = "";
		switch (choose) {
		case 1:
			backType = "yyyy-MM-dd";
			break;
		case 2:
			backType = "yyyy-MM-dd HH:mm:ss";
			break;
		case 3:
			backType = "yyyy-MM-dd HH:mm:ss:SSS";
			break;
		case 4:
			backType = "yyyy-MM-dd hh:mm:ss a";
			break;
		case 5:
			backType = "yyyy-MM-dd HH:mm";
			break;
		}
		return backType;
	}

}
