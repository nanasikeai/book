CREATE TABLE `user`
(
    `id`         bigint(20)   NOT NULL AUTO_INCREMENT COMMENT 'id',
    `username`   varchar(256) NOT NULL COMMENT '用户名',
    `password`   varchar(512) NOT NULL COMMENT '密码',
    `avatar`     varchar(256)          COMMENT '头像',
    `signature`  varchar(256)          COMMENT '个性签名',
    `createTime` datetime              DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` datetime              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB COMMENT ='用户'