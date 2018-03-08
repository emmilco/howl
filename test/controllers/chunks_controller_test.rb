require 'test_helper'

class ChunksControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get chunks_create_url
    assert_response :success
  end

end
