#project_table

# 项目表 (`project`)

```sql
CREATE TABLE `project` (
  `project_id` int NOT NULL AUTO_INCREMENT COMMENT '项目ID，主键',
  `project_name` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '项目名称',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
```
#user_table
```sql
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '用户名',
  `pass_word` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '密码',
  `Email` varchar(100) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
```

#project_image table
```sql
CREATE TABLE `project_image` (
  `image_id` int NOT NULL AUTO_INCREMENT COMMENT '图片ID，主键',
  `image_path` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '图片存储路径',
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '图片上传时间',
  `project_id` int NOT NULL COMMENT '项目ID，外键',
  PRIMARY KEY (`image_id`),
  KEY `projectID` (`project_id`),
  CONSTRAINT `projectimage_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
```
#user_project table
```sql
CREATE TABLE `user_project` (
  `user_project_id` int NOT NULL AUTO_INCREMENT COMMENT '用户项目映射表ID,主键',
  `project_id` int NOT NULL COMMENT '项目ID，外键，与项目表关联',
  `user_id` int NOT NULL COMMENT '用户ID，外键，关联User表',
  PRIMARY KEY (`userProject_id`),
  KEY `userproject_fk_1` (`project_id`),
  KEY `userproject_fk_2` (`user_id`),
  CONSTRAINT `userproject_fk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `userproject_fk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='用户-项目映射表';
```