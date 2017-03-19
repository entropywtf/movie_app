require 'test_helper'
require 'json'

class Api::V1::CategoriesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  def setup
    sign_in User.first
  end

  def teardown
    sign_out :user
  end

  test "Should list index even for unauthorized users" do
    sign_out :user
    Category.create(name: "TestCategory")
    get :index, format: :json
    assert_response :success
    jdata = JSON.parse response.body
    assert jdata.any?{ |h| h["name"] == "TestCategory" }
  end
end

