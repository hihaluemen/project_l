# 表的创建

## 创建user表

```sql
CREATE TABLE `user` (
  `UserID` int NOT NULL COMMENT '用户ID',
  `UserName` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '用户名',
  `Password` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '密码',
  `Email` varchar(100) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

## 创建 project表

```sql
CREATE TABLE `project` (
  `projectID` int NOT NULL AUTO_INCREMENT,
  `projectName` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

## 创建 project_image表

```sql
CREATE TABLE `projectimage` (
  `ImageID` int NOT NULL COMMENT '图片ID，主键',
  `ImagePath` varchar(100) COLLATE utf8mb3_bin NOT NULL COMMENT '图片存储路径',
  `UploadTime` datetime NOT NULL COMMENT '图片上传时间',
  `projectID` int NOT NULL COMMENT '项目ID，外键',
  PRIMARY KEY (`ImageID`),
  KEY `projectID` (`projectID`),
  CONSTRAINT `projectimage_ibfk_2` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

## 创建 user_project表

```sql
CREATE TABLE `userproject` (
  `UserProjectID` int NOT NULL AUTO_INCREMENT COMMENT '用户项目映射表ID,主键',
  `projectID` int NOT NULL COMMENT '项目ID，外键，与项目表关联',
  `UserID` int NOT NULL COMMENT '用户ID，外键，关联User表',
  PRIMARY KEY (`UserProjectID`),
  KEY `userproject_fk_1` (`projectID`),
  KEY `userproject_fk_2` (`UserID`),
  CONSTRAINT `userproject_fk_1` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`),
  CONSTRAINT `userproject_fk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='用户-项目映射表';

