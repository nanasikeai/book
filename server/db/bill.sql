CREATE TABLE `bill`
(
    `id`         bigint(20)   NOT NULL AUTO_INCREMENT COMMENT 'id',
    `pay_type`   INT NOT NULL COMMENT '账单类型',
    `amount`     varchar(100) NOT NULL COMMENT '金额',
    `date`       datetime NOT NULL   COMMENT '账单日期',
    `type_id`    INT  NOT NULL  COMMENT '账单标签id',
    `type_name`  varchar(256) NOT NULL   COMMENT '账单标签名',
    `user_id`    bigint(20)  NOT NULL  COMMENT '用户id',
    `remark`     varchar(256)    COMMENT '账单备注',
    `createTime` datetime              DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updateTime` datetime              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB COMMENT ='账单'