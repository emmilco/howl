require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_users_create_url
    assert_response :success
  end

  test "should get show" do
    get api_users_show_url
    assert_response :success
  end

  test "should get update" do
    get api_users_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_users_destroy_url
    assert_response :success
  end

  test "should get follow" do
    get api_users_follow_url
    assert_response :success
  end

  test "should get unfollow" do
    get api_users_unfollow_url
    assert_response :success
  end

end
