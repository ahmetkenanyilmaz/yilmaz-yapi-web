-- 4K drone videoları için proje medya kovası limiti (5 GB)
update storage.buckets
set file_size_limit = 5368709120
where id = 'project-media';
