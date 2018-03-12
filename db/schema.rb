# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180312013707) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title", default: "untitled"
    t.integer "author_id", null: false
    t.datetime "publish_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "published"
    t.index ["author_id"], name: "index_articles_on_author_id"
    t.index ["publish_date"], name: "index_articles_on_publish_date"
  end

  create_table "chunks", force: :cascade do |t|
    t.integer "chunkable_id", null: false
    t.text "content"
    t.integer "ord", null: false
    t.string "content_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.index ["chunkable_id"], name: "index_chunks_on_chunkable_id"
    t.index ["ord"], name: "index_chunks_on_ord"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "article_id", null: false
    t.integer "author_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_comments_on_article_id"
    t.index ["author_id"], name: "index_comments_on_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.string "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["email"], name: "index_users_on_email"
  end

end
