require 'test_helper'

class Api::ChunksControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_chunks_create_url
    assert_response :success
  end

end
