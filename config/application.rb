require_relative 'boot'
require 'unsplash'
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Howl
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    Unsplash.configure do |config|
      config.application_id     = "1b15d71a05bb0643510148d8ac9aec20e2b18124e7b72be1375a9f570550bfa2"
      config.application_secret = "dfcabfafc344bf52da2269098dc6e7dd015f805a9546145c5717fe8499edd52e"
      config.application_redirect_uri = "https://your-application.com/oauth/callback"
      config.utm_source = "howl"
    end

    config.paperclip_defaults = {
      :storage => :s3,
      :s3_credentials => {
        :bucket => ENV["s3_bucket"],
        :access_key_id => ENV["s3_access_key_id"],
        :secret_access_key => ENV["s3_secret_access_key"],
        :s3_region => ENV["s3_region"]
      }
    }

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
