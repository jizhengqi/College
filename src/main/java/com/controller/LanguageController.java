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
import com.entity.Module;
import com.service.LanguageService;
import com.service.ModuleService;

@Controller
@RequestMapping("language")
public class LanguageController {

	@Resource
	LanguageService languageService;

	@Resource
	ModuleService ms;

	Integer rs;

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
	public List<Curriculum> queryByLanguage(String l_name, Integer c_vip,
			Integer c_level, Model model) {
		List<Curriculum> list = languageService.queryByLanguage(l_name, c_vip,
				c_level);
		return list;
	}

	// 查询所有的语言分类
	@RequestMapping("queryAll")
	@ResponseBody
	public List<Language> queryAll() {
		List<Language> list = languageService.queryAll();
		return list;
	}

	// 根据编号查询所有语言分类
	@RequestMapping("del")
	@ResponseBody
	public Integer del(Integer l_id) {
		List<Module> list = ms.queryByl_id(l_id);
		if (list.size() > 0) {
			rs = 2;
		} else {
			languageService.del(l_id);
			rs = 1;
		}
		return rs;
	}

	// 添加语言分类
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Language l) {
		languageService.add(l);
		rs = 1;
		return rs;
	}

	// 修改语言分类
	// 添加语言分类
	@RequestMapping("upd")
	@ResponseBody
	public Integer upd(Language l) {
		languageService.upd(l);
		rs = 1;
		return rs;
	}

	// 查询所有语言分类
	@RequestMapping("queryLanguage")
	@ResponseBody
	public Map<String, Object> queryLanguage(Integer page, Integer limit) {
		List<Language> list = languageService.queryAll();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "");
		map.put("code", 0);
		map.put("count", list.size());
		map.put("data", languageService.SelectByD_id((page - 1) * limit, limit));
		return map;
	}

}
