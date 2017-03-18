require 'test_helper'
require 'json'

class Api::V1::RatingsControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  def setup
    sign_in User.first
  end

  def teardown
    sign_out :user
  end

  test "Should create or update rating if one exists for the user" do
    assert_difference 'Rating.count', 1 do
      post :create, params: { rating: {movie_id: 1,
        score: 5} }, format: :json
    end
    assert_response :success
    r = Rating.last
    assert_equal 5, r.score
    jdata = JSON.parse response.body
    assert_equal 1, jdata["movie_id"]

    assert_no_difference 'Rating.count' do
      post :create, params: { rating: {movie_id: 1,
        score: 3} }, format: :json
    end
    assert_response :success
    r.reload
    assert_equal 3, r.score
    jdata = JSON.parse response.body
    assert_equal 1, jdata["movie_id"]
  end

  test "Should not create if user is not signed in" do
    sign_out :user
    assert_no_difference 'Rating.count' do
      post :create, params: { rating: {movie_id: 1,
        score: 5} }, format: :json
    end
    assert_response :unauthorized
  end

end
