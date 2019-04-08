package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Curriculum;
import com.service.CurriculumService;
import com.util.MyWebConfig;

@Controller
@RequestMapping("curriculum")
@EnableConfigurationProperties(MyWebConfig.class)
public class CurriculumController {

	@Resource
	CurriculumService curriculumService;

	/**
	 * 添加课程
	 * 
	 * @param curriculum
	 * @return
	 */
	@RequestMapping("addCurriculum")
	@ResponseBody
	public Integer addCurriculum(Curriculum curriculum) {
		curriculum.setC_vip(curriculum.getC_typeOfCourse());
		System.out.println(curriculum);
		return curriculumService.addCurriculum(curriculum);
	}

	/**
	 * 查询自己录制的课程
	 * 
	 * @param u_id
	 * @return
	 */
	@RequestMapping("queryCurriculum")
	@ResponseBody
	public List<Curriculum> queryCurriculum(String u_id) {
		return curriculumService.queryCurriculum(u_id);
	}
	
	/**
	 * 分页查询所有课程
	 * 
	 * @return
	 */
	@RequestMapping("queryByPage")
	@ResponseBody
	public Map<String,Object> queryByPage(Integer page,Integer limit){
		List<Curriculum> list = curriculumService.queryByPage((page-1)*limit, limit);
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("msg", "");
		map.put("code", 0);
		map.put("count", curriculumService.queryAll().size());
		map.put("data", list);
		return map;
	}
	
	// 根据ID查询视频信息
	@RequestMapping("queryById")
	@ResponseBody
	public List<Curriculum> queryById(Integer c_id){
		List<Curriculum> list = curriculumService.queryById(c_id);
		return list;
	}
	
	// 查询前台推荐课程
	@RequestMapping("selectAll")
	@ResponseBody
	public List<Map<String,Object>> selectAll(){
		List<Map<String, Object>> list = curriculumService.selectAll();
		return list;
	}
	
	// 根据技术方向查询所有问题
	@RequestMapping("queryByDirection")
	@ResponseBody
	public List<Map<String,Object>> queryByDirection(String d_name){
		List<Map<String, Object>> list = curriculumService.queryByDirection(d_name);
		return list;
	}
	
	// 根据技术方向查询所有问题
	@RequestMapping("queryByLanguage")
	@ResponseBody
	public List<Map<String,Object>> queryByLanguage(String l_name){
		List<Map<String, Object>> list = curriculumService.queryByLanguage(l_name);
		return list;
	}
		
	// 根据技术方向查询所有问题
	@RequestMapping("queryByModule")
	@ResponseBody
	public List<Map<String,Object>> queryByModule(String m_name){
		List<Map<String, Object>> list = curriculumService.queryByModule(m_name);
		return list;
	}
}
