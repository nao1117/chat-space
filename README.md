# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false ,unique: true|
|password|string|null: false ,unique: true|
|nickname|string|index: true,null: false ,unique: true|
### Association
- has_many : groups,through: :members
- has_many : comments 
- has_many : members


## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null:true|
|image_id|text|null:true|
|group_id|integer|null: false , foreign_key: true|
|user_id|integer|null: false , foreign_key: true|
### Association
- belongs_to :user 
- belongs_to :group
- has_many :images
## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image_url|text||
|comment_id|integer|null: false|
### Association
- belongs_to :comment
## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false , unique: true|
|comment_id|integer|null: false|
|user_id|integer|null: false|
### Association
- has_many :comments
- has_many :users, through: :members
- has_many :members
## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false ,foreign_key: true|
|group_id|integer|null: false ,foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group





