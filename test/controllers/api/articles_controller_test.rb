require 'test_helper'

class Api::ArticlesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_articles_show_url
    assert_response :success
  end

  test "should get create" do
    get api_articles_create_url
    assert_response :success
  end

  test "should get update" do
    get api_articles_update_url
    assert_response :success
  end

  test "should get index" do
    get api_articles_index_url
    assert_response :success
  end

  test "should get destroy" do
    get api_articles_destroy_url
    assert_response :success
  end

  test "should get howl" do
    get api_articles_howl_url
    assert_response :success
  end

  test "should get unhowl" do
    get api_articles_unhowl_url
    assert_response :success
  end

end
