package com.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class CookieUtils {
	public String getCookie(HttpServletRequest request, String cookieName) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(cookieName)) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	public void setCookie(HttpServletResponse response, String cookieName,
			String value) {
		Cookie cookie = new Cookie(cookieName, value);
		cookie.setMaxAge(60 * 60 * 24 * 7);
		response.addCookie(cookie);
	}
}
