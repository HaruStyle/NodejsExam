use restful;
select * from user;


drop table restful.user;
commit;
use restful;

create table user(id integer primary key auto_increment,
user_id text, 
password text,
alias text,
name text,
age text);

select * from user;

create table user_login(
id integer primary key auto_increment,
user_real_id integer,
token text,
create_at datetime default  current_timestamp 
);

select * from user_login;

drop table restful.ranking;
commit;
use restful;

create table ranking(
seq integer primary key auto_increment,
ramen text,
water text,
rice  text,
bread text,
gcnt integer,
recnt integer
);

select * from ranking;
select seq,(select count(*)+1 from ranking where gcnt > t.gcnt) as rank,ramen,water,rice,bread,gcnt,recnt 
from ranking as t order by rank limit 0 ,100;
update ranking set gcnt=gcnt+1 where seq=1;

select seq, ramen,water,rice,bread,gcnt,recnt from ranking where seq = 1;

update ranking set recnt=(select count(*) from reply where ori_seq = 1) where seq=1;

drop table restful.reply;
commit;
use restful;

create table reply(
ori_seq integer,
seq integer,
contxt text,
create_at datetime default current_timestamp
);

select seq,contxt,DATE_FORMAT(create_at,"%Y-%m-%d") as ins_date from reply where ori_seq = 1 order by create_at desc;
select * from reply;

insert into reply(ori_seq,seq, contxt) (select 1, (select ifnull(max(seq)+1,1) from reply where ori_seq =1), "dd" from dual); 


drop table kinds;
create table kinds(seq integer primary key auto_increment,
kind text, 
kind_no text,
name text,
detail text,
price text
);
select * from kinds;