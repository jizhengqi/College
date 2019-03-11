package com.test;

import javax.annotation.Resource;

import com.service.LanguageService;

public class T {

	@Resource
	static LanguageService service;

	public static void main(String[] args) {
		System.out.println(service.queryLangguage());
	}

}
