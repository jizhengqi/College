package com.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.DirectionDao;
import com.dao.LanguageDao;
import com.dao.ModuleDao;
import com.entity.Curriculum;
import com.entity.Direction;
import com.entity.Language;

@Service
@Transactional
public class LanguageService {

	@Resource
	LanguageDao ld;

	public void add(Language l) {
		ld.add(l);
	}

	public void upd(Language l) {
		ld.upd(l);
	}

	public void del(Integer l_id) {
		ld.del(l_id);
	}

	public List<Language> queryAll() {
		return ld.queryAll();
	}

	public void queryPage() {

	}

	@Resource
	DirectionDao directionDao;// 技术方向

	@Resource
	ModuleDao moduleDao;// 语言和模块

	/**
	 * 查询技术方向，语言，和模块做嵌套
	 * 
	 * @return
	 */
	public Map<String, List<Map<String, List<String>>>> queryLangguage() {
		Map<String, List<Map<String, List<String>>>> direction = new HashMap<String, List<Map<String, List<String>>>>();
		List<Map<String, List<String>>> languages = new ArrayList<Map<String, List<String>>>();// 将语言放入集合
		Map<String, List<String>> language = new HashMap<String, List<String>>();// 语言
		List<String> module = new ArrayList<String>();// 模块集合
		// 查询方向和语言、模块
		List<Direction> list = directionDao.queryAll();
		List<Map<String, Object>> queryAll = moduleDao.queryAll();
		Integer length = list.size();
		Integer mlength = queryAll.size();
		for (int i = 0; i < length; i++) {
			languages = new ArrayList<Map<String, List<String>>>();
			for (int j = 0; j < mlength; j++) {
				String m_name = (String) queryAll.get(j).get("m_name");// 查到的模块
				String l_name = (String) queryAll.get(j).get("l_name");// 获取语言名称
				Integer d_id2 = (Integer) queryAll.get(j).get("d_id");// 获取语言主键
				if (null != m_name) {
					String[] split = m_name.split(",");
					language = new HashMap<String, List<String>>();
					module = new ArrayList<String>();
					for (String string : split) {
						module.add(string);// 将模块添加到集合
					}
					language.put(l_name, module);
					if (d_id2.equals(list.get(i).getD_id())) {
						languages.add(language);
					}
				}
			}
			direction.put(list.get(i).getD_name(), languages);
		}
		// MyFileUtils.writeToFile("D:/direction.txt", direction.toString());
		return direction;
	}
	
	// 根据语言查询所有课程
	public List<Curriculum> queryByLanguage(String l_name){
		return ld.queryByLanguage(l_name);
	}
}
