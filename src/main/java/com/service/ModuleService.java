package com.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.ModuleDao;

@Service
@Transactional
public class ModuleService {
	
	@Resource
	ModuleDao md;
	
	// 查询所有语言和所有语言板块
	public List<Map<String,Object>> queryAll(){
		return md.queryAll();
	}
}
