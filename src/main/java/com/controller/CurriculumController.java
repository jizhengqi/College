package com.controller;

import java.util.List;

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

}
