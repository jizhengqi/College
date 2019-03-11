package com.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MyFileUtils {

	@Resource
	private MyWebConfig myWebConfig;

	/**
	 * 单文件上传
	 * 
	 * @param file
	 * @param path
	 * @return 文件名称
	 * @throws Exception
	 * @throws IllegalStateException
	 */
	public String upload(MultipartFile file) throws IllegalStateException,
			Exception {
		// 解决中文问题,liunx 下中文路径,视频显示问题
		String uploadPath = UUID.randomUUID()
				+ getSuffix(file.getOriginalFilename());
		// 创建路径
		File dest = new File(myWebConfig.getVideoDir() + uploadPath);
		// 检测是否存在目录
		checkDirectory(dest);
		// 赋值文件到指定路径
		file.transferTo(dest);
		return uploadPath;
	}

	/**
	 * 多文件上传
	 * 
	 * @param file
	 * @param path
	 * @return
	 * @throws Exception
	 * @throws IllegalStateException
	 */
	public String[] uploads(MultipartFile[] file) throws IllegalStateException,
			Exception {
		int length = file.length;
		String[] uploadPaths = new String[length];
		for (int i = 0; i < length; i++) {
			uploadPaths[i] = upload(file[i]);
		}
		return uploadPaths;
	}

	/**
	 * 截取文件后缀<br>
	 * 例如：.jpg
	 * 
	 * @param fileName
	 * @return
	 */
	public static String getSuffix(String fileName) {
		return fileName.substring(fileName.lastIndexOf("."));
	}

	/**
	 * 检测目录是否存在
	 * 
	 * @param file
	 */
	public static void checkDirectory(File file) {
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
	}

	/**
	 * 往文件中追加数据<br>
	 * FileWriter
	 * 
	 * @param path
	 * @param data
	 * @param encoding
	 * @return
	 */
	public static boolean writeToFile(String path, String data) {
		File file = new File(path);
		FileWriter fw = null;
		boolean flag = false;
		try {
			fw = new FileWriter(file, true);
			fw.write(data);
			fw.write("\r\n");
			flag = true;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fw.flush();
				fw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
		return flag;
	}

	/**
	 * 用RandomAccessFile将文本内容保存到一个文件中<br/>
	 * 随机流实现断点续传效果
	 * 
	 * @param filePath
	 *            文件路径
	 * @param len
	 *            内容在文件中的位置
	 * @param content
	 *            要存入文件的内容
	 * @throws Exception
	 */
	public static boolean writeFileByContent(String filePath, int len,
			String content) {
		boolean ft = false;
		RandomAccessFile raf = null;
		FileOutputStream fos = null;
		FileInputStream fis = null;
		File tmp = null;
		try {
			File dest = new File(filePath);
			tmp = File.createTempFile("tmp",
					filePath.substring(filePath.lastIndexOf(".")));
			tmp.deleteOnExit();
			raf = new RandomAccessFile(dest, "rw");
			fos = new FileOutputStream(tmp);
			raf.seek(len);
			byte[] b = new byte[1024];
			int num = 0;
			while (-1 != (num = raf.read(b))) {
				fos.write(b, 0, num);
			}
			// 把插入的内容写进去
			raf.seek(len);
			raf.writeBytes(content);
			// 再把临时文件的内容再拿过来写进去
			raf.seek(len + content.getBytes().length);
			fis = new FileInputStream(tmp);
			int n = 0;
			while ((n = fis.read()) != -1) {
				raf.write(n);
			}
			ft = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 删除临时文件
				tmp.delete();
				// 关闭输入输出流
				fis.close();
				fos.close();
				raf.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return ft;
	}
}
