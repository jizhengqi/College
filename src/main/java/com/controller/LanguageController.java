package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Curriculum;
import com.entity.Language;
import com.service.LanguageService;

@Controller
@RequestMapping("language")
public class LanguageController {

	@Resource
	LanguageService languageService;

	@RequestMapping("query")
	@ResponseBody
	public Map<String, List<Map<String, List<String>>>> test() {
		return languageService.queryLangguage();
	}
	
	/*
	 * 根据技术方向查询所有课程
	 */
	@RequestMapping("queryByLanguage")
	@ResponseBody
	public List<Curriculum> queryByLanguage(String l_name,Model model){
		List<Curriculum> list = languageService.queryByLanguage(l_name);
		return list;
	}
	
	// 查询所有语言分类
	@RequestMapping("queryLanguage")
	@ResponseBody
	public Map<String,Object> queryLanguage(Integer page,Integer limit){
		List<Language> list = languageService.queryAll();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("msg", "");
		map.put("code", "");
		map.put("count", languageService.queryAll().size());
		map.put("data", languageService.queryLanguage((page-1)*limit, limit));
		return map;
	}
	
}
